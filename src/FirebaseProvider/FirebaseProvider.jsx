import { createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config.js";
import { useState, useEffect } from "react";

export const AuthContext = createContext(null)

// eslint-disable-next-line react/prop-types
const FirebaseProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const [user, setUser] = useState(null)

    const createUser = (email, password, name, photo_url) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                if (result.user) {
                    return updateProfile(result.user, {
                        displayName: name,
                        photoURL: photo_url
                    }).then(() => {
                        setUser(result.user);
                        console.log(result.user);
                    });
                }
            })
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user)
            })
    }

    // const handleSocialLogin = (socialProvider) => {
    //     socialProvider().then(result => {
    //         if (result.user) {
    //             navigate(from)
    //         }
    //     })
    // }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const signInWithGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logout = () => {
        setUser(null)
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setLoading(false)
            } else {
                setUser(null);
                setLoading(false)
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const allValues = {
        createUser,
        signInUser,
        signInWithGoogle,
        signInWithGithub,
        logout,
        loading,
        user,
        theme,
        setTheme
    }

    return (
            <AuthContext.Provider value={allValues}>
                {children}
            </AuthContext.Provider>
    );
};

// FirebaseProvider.prototype = {
//     children: PropTypes.node.isRequired
// }

export default FirebaseProvider;