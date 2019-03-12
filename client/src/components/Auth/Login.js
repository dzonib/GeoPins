import React, { useContext } from "react"
import { withStyles } from "@material-ui/core/styles"
import { GoogleLogin } from "react-google-login"
import { GraphQLClient } from "graphql-request"

import Context from "../../context"

// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
	me {
		_id
    name
    email
    picture
  }
}
`
const Login = ({ classes }) => {
    const { dispatch } = useContext(Context)

    const onSuccess = async googleUser => {
        // easy way to get token
        const idToken = googleUser.getAuthResponse().id_token

        const client = new GraphQLClient("http://localhost:4000/graphql", {
            headers: { authorization: idToken }
        })

        const data = await client.request(ME_QUERY)
        // console.log({ data })
        dispatch({type: "LOGIN_USER", payload: data.me})
    }

    return (
        <GoogleLogin
            clientId="298398267602-2kth3ldbn0c6lldigosbjg87mgo0tq51.apps.googleusercontent.com"
            onSuccess={onSuccess}
            isSignedIn={true}
        />
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
