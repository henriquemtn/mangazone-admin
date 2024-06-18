import { getAuth, onAuthStateChanged } from "firebase/auth";

export const checkUserToken = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          // Optionally, you can verify the token server-side here.
          resolve(true);
        }).catch((error) => {
          console.error("Error fetching token:", error);
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  });
};
