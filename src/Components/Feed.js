import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const FeedExampleBasic = () => (
    <Feed>
        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>John Smith</Feed.User> added this quote to his MottoBook: <a>The need to be right is the sign of a vulgar mind.</a>
                     by <Feed.User>Albert Camus</Feed.User>
                    <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>Yang Du</Feed.User> added this quote to his MottoBook: <a>The great question of our time is, 'Will we be motivated by materialistic philosophy or by spiritual power?'</a>
                    by <Feed.User>Billy Graham</Feed.User>
                    <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    You added this quote to your MottoBook: <a>Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
                    </a>
                    by <Feed.User>Steve Jobs</Feed.User>
                    <Feed.Date>24 Hour Ago</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>

        <Feed.Event>
            <Feed.Content>
                <Feed.Summary>
                    <Feed.User>Brain Tracy</Feed.User> added this quote to his MottoBook: <a>Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.
                </a>
                    by <Feed.User>Steve Jobs</Feed.User>
                    <Feed.Date>24 Hour Ago</Feed.Date>
                </Feed.Summary>
            </Feed.Content>
        </Feed.Event>

    </Feed>
)

export default FeedExampleBasic