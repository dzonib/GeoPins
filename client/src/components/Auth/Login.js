import React, { useContext } from "react"
import { withStyles } from "@material-ui/core/styles"
import { GoogleLogin } from "react-google-login"
import { GraphQLClient } from "graphql-request"

import Context from "../../context"
import { ME_QUERY } from "../../graphql/queries"

import Typography from "@material-ui/core/Typography"

const Login = ({ classes }) => {
    const { dispatch } = useContext(Context)

    const onSuccess = async googleUser => {
        try {
            // easy way to get token
            const idToken = googleUser.getAuthResponse().id_token

            const client = new GraphQLClient("http://localhost:4000/graphql", {
                headers: { authorization: idToken }
            })

            const { me } = await client.request(ME_QUERY)

            dispatch({ type: "LOGIN_USER", payload: me })

            // will return true when google oath authenticate user
            dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() })
        } catch (err) {
            onFailure(err)
        }
    }

    const onFailure = err => {
        console.log("Error logging in", err)
    }

    return (
        <div className={classes.root}>
            <Typography
                component="h1"
                variant="h3"
                gutterBottom
                noWrap
                style={{ color: "rgb(66, 133, 244)" }}
            >
                Wellcome
            </Typography>
            <GoogleLogin
                clientId="298398267602-2kth3ldbn0c6lldigosbjg87mgo0tq51.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                theme="dark"
                buttonText="Login with Google"
            />
        </div>
    )
}

const styles = {
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
}

export default withStyles(styles)(Login)
