import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import history from '../history';
import {createApolloFetch} from 'apollo-fetch';
import graphqlEndPoint from "../GraphQLConfig"

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid email profile'
  });

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.getUserIDHelper = this.getUserIDHelper.bind(this);
  }

  getUserProfile = (that) => new Promise(function(resolve, reject){
      if (!that.userProfile) {
          that.getProfile((err, profile) => {
              resolve(profile)
          });
      } else {
          resolve(that.userProfile)
      }
  })

  getUserId = (sub) => new Promise(function(resolve, reject){
      const uri = graphqlEndPoint.prisma
      const apolloFetch = createApolloFetch({uri})
      const query = `
          query{
            user(where:{sub: "${sub}"}){
              id
            }
          }
      `

      apolloFetch({query})
          .then(result => {
              const {data} = result;
              if (data){
                  resolve(data.user.id)
              }
          })
  })

    async getUserIDHelper(){
        const {sub} = await this.getUserProfile(this);
        const userId = await this.getUserId(sub)
        this.userProfile = {
            ...this.userProfile,
            prisma_userId: userId,
        }
        const userProfile = localStorage.getItem('userProfile');
        localStorage.setItem('userProfile', {
            ...userProfile,
            prisma_userId: userId,
        });
    }

  login() {
    this.auth0.authorize();
    this.getProfile();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  submitProfile() {
      console.log('userProfile', this.userProfile);
      const {email, family_name, given_name, locale, name, nickname, picture, sub} = this.userProfile;
      const uri = graphqlEndPoint.prisma;
      const apolloFetch = createApolloFetch({uri})

      const mutationQuery = `
            mutation createUser{
                createUser(data:{email:"${email}"
                givenname:"${given_name}"
                familyname:"${family_name}"
                nickname:"${nickname}"
                name:"${name}"
                picture:"${picture}"
                locale:"${locale}"
                sub:"${sub}"})
                {
                    sub
                }
            }
            
      `

      apolloFetch({query:mutationQuery})
          .then(result => {
              const {errors} = result;
              if (errors){
                  if (errors[0].code ===3010){
                      console.log("user already exists")
                  }
              }

              //console.log('result', result)
          })

  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        localStorage.setItem('userProfile', profile);
        this.submitProfile()
      }
      cb(err, profile);
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userProfile');
    this.userProfile = null;
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
