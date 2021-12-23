import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebase";
import { set } from "firebase/database";
import fireDb from "./firebase";


const authContext = createContext();

const useAuth = () => {
    return useContext(authContext);
}


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState({});
    const [lm, setLm] = useState({});
    const [req, setReq] = useState({});
    const [r, setR] = useState({});
    // const [roles, setRoles] = useState({});
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);

            } else {
                setUser(false)

            }
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const register = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password,)
                setUser(user);
                resolve(user);
            } catch (error) {
                reject(error);
            }
        })
    }

    const signIn = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                setUser(user);
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await signOut(auth);
                resolve(null);
            } catch (error) {
                reject(error);
            }
        });
    }

    const createUser = (ref, { ...value }) => {
        set(ref, { ...value }, (err) => {
            if (err) {
                console.log("System error" + err);
            } else {
                console.log("user updated successfully");
            }
        });
    }

    const newRequest = ({ ...values }, ref) => {
        const refrence = fireDb.child(ref);
        const autoID = refrence.push().key
        refrence.child(autoID).set({
            ...values,
            id: autoID
        })
    }

    const User_Ftch = () => {
        fireDb.child("user/").on("value",
            (snapshot) => {
                if (snapshot.val() !== null) {
                    setData({ ...snapshot.val() });
                } else {
                    setData({});
                }
            });
        return () => {
            setData({});
        }

    }






    const LM_Ftch = () => {
        fireDb.child("user/").on("value",
            (snapshot) => {
                if (snapshot.val() !== null) {
                    setLm({ ...snapshot.val() });
                } else {
                    setLm({});
                }
            });
        return () => {
            setLm({});
        }

    }

    const Req_Ftch = () => {
        fireDb.child("Requests/leave/").on("value",
            (snapshot) => {
                if (snapshot.val() !== null) {
                    setReq({ ...snapshot.val() });
                } else {
                    setReq({});
                }
            });
        return () => {
            setReq({});
        }

    }


    
    const fe = ()=>{
        fireDb.child("user/").on("value", (snapshot) => {
            if (snapshot.val !== null){

                fireDb.child("user/").orderByChild("role").equalTo("Line_Manger").on("value", (snapshot) => {
                    if (snapshot.val() !== null) {
                        setR({ ...snapshot.val() });
                    } else {
                        setR({});
                    }
                });
            }else{
                setR({});
            }
        });
        
        return ()=>{
            setR({});
        }

    }


    useEffect(() => {
        User_Ftch();
        LM_Ftch();
        Req_Ftch(); 
        fe();
    }, []);


    return (
        <authContext.Provider value={{ user, signIn, logout, register, createUser, newRequest, data, lm, req,r }}> {children} </authContext.Provider>
    )
}
export { AuthProvider, useAuth };