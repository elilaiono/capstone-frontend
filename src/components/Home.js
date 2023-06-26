import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { React, useEffect, useState } from 'react';

const Home = () => {
  const [userList, setUserList] = useState([]);

  const userCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id}))
        // console.log(filteredData)
        setUserList(filteredData)
      } catch (error) {
        console.error(error)
      }
    };

    getUserList();
  }, []);

    return (
        <div>
        {userList.map((user) => (
            <div key={user.id}>
                <h1>{user.firstName} {user.lastName}</h1>
                <p>{user.email}</p>
            </div>
        ))}
        </div>
        );
    };
 
export default Home;