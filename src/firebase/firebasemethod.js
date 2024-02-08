import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

//initialize firestore database
const db = getFirestore(app);

// register user

let signUpUser = (obj) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async (res) => {
        resolve((obj.uid = res.user.uid));
        const dbObj = {
          email: obj.email,
          uid: res.user.uid,
          type: obj.type,
        };
        await addDoc(collection(db, "users"), dbObj)
          .then((res) => {
            console.log("user added to database successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

// login user
let loginUser = (obj) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async () => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          resolve(doc.data());
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//signout User
const signOutUser = (type) => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        if (type === "students") {
          alert("student Logout Successfully");
        } else {
          resolve("user Signout Successfully");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//send data to firestore
let sendData = (obj, colName) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, colName), obj)
      .then((res) => {
        resolve("data send to db successfully", res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//get single data with id from firestore
const getSingleData = (colName, id) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = [];
    const q = query(collection(db, colName), where("stid", "==", id));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArr.push(doc.data());
      });
      resolve(dataArr);
    } catch (error) {
      reject("error occured");
    }
  });
};

//get data with id from firestore
const getData = (colName) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = [];
    const q = query(
      collection(db, colName),
      where("id", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
      resolve(dataArr);
    });
    reject("error occured");
  });
};

//get all data
const getAllData = (colName) => {
  return new Promise(async (resolve, reject) => {
    const dataArr = [];
    const querySnapshot = await getDocs(collection(db, colName));
    querySnapshot.forEach((doc) => {
      const obj = { ...doc.data(), documentId: doc.id };
      dataArr.push(obj);
      resolve(dataArr);
    });
    reject("error occured");
  });
};

//Delete document by id
const deleteDocument = async (name, id) => {
  try {
    const deletehorhahai = await deleteDoc(doc(db, name, id));
    console.log(deletehorhahai);
    return "Document deleted successfully";
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error; // re-throw the error to propagate it to the caller
  }
};

// const deleteDocument = async (id, name) => {
//     return new Promise((resolve, reject) => {
//         deleteDoc(doc(db, name, id));
//         resolve("document deleted")
//         reject("error occured")
//     })
// }

//update document by id
const updateDocument = async (obj, id, name) => {
  return new Promise((resolve, reject) => {
    const update = doc(db, name, id);
    updateDoc(update, obj);
    resolve("document updated");
    reject("error occured");
  });
};

// export default signOutUser
export {
  auth,
  db,
  getSingleData,
  signUpUser,
  loginUser,
  sendData,
  signOutUser,
  getData,
  getAllData,
  deleteDocument,
  updateDocument,
};
