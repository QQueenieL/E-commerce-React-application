import { createUserdocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserdocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with google Popup</button>
        </div>
    )
}

export default SignIn;