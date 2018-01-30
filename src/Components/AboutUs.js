import React, { Component }from 'react'
import MottoBookHeader from './Header'
import MottoBookFooter from './Footer'

export default class AboutUs extends Component {
    render() {
        return (
        <div>
            <MottoBookHeader auth={this.props.auth} {...this.props}/>

            <div class="ui vertical stripe segment">
                <div class="ui text container">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h3 class="ui header">Open Letter</h3>
                    <p>
                        In the beginning was the word, and the word was with God and the word was God. (John 1:1).
                        I'm creating this website to collect all the wisdom words, all the inspired words.
                        All men are created equal but all words are not created equal. Successful people's quotes can bring
                        wisdom, inspiration and love to other people.
                    </p>
                    <p>
                        Motto is a phrase that people live by. It can help people to define intention, ethics and principles.
                        By looking at other successful people's quotes, we can find our own motto through them.
                    </p>
                    <p>
                        We are bombarded by information nowadays. Facebook/Twitter bring all kinds of information to us. No matter
                        good or bad; no matter happy or sad; no matter important or non-sense.
                        Imagine a social network where only good quotes are present on the platform where people come here only looking
                        for wisdom, inspiration, love, good, light. This is what this MottoBook is aimed to achieve.
                    </p>
                    <p>
                        I have two beautiful young boys. One is one year old and the other is 3 years old. I hope when they grow up,
                        they are living in a better world. Their mind are not pollutted by all kinds of information from platform such as
                        Facebook or Twitter. I will build a platform only having good information and filter out bad information.
                    </p>

                    <p>
                        One's power is limited, however with all your help, this website can grow like a giant tree. You can
                        give help by continue using this website or providing support by donation.
                    </p>
                    <p>
                        This website is under active development, you may notice some features are not working properly.
                        <br/><br/>
                        Pleaes also share your feedback or suggestion by sending an email to mottobook@gmail.com. I will respond to every message I receive.
                    </p>

                    <p>
                        Thank you.
                        <br/><br/>
                        Sincerely,
                        <br/>
                        Yang Du
                        <br/>
                        Founder of MottoBook.com
                    </p>

                    <br/>
                </div>
            </div>
            <MottoBookFooter />
        </div>
        )
    }
}
