export const fetchUserCollectionData = async (collectionName, userId) => {
  try {
    const baseUrl = "https://apex-lifter-backend.onrender.com"
    // const baseUrl = process.env.REACT_APP_BASE_URL
    const response = await fetch(`${baseUrl}/${collectionName}/${userId}`);
    if (response.ok) {
      const collectionData = await response.json();
      // Return the collection data
      return collectionData;
    } else {
      throw new Error(`Error retrieving ${collectionName} data`);
    }
  } catch (error) {
    console.error(`Error fetching ${collectionName} data:`, error);
    throw error;
  }
};

export const fetchUserSubCollectionData = async (collectionName, subCollectionName = null, userId = null) => {
  try {
    // const baseUrl = process.env.REACT_APP_BASE_URL
    const baseUrl = "https://apex-lifter-backend.onrender.com"

    let url = `${baseUrl}/${collectionName}/${subCollectionName}/${userId}`;

    const response = await fetch(url);

    if (response.ok) {
      const collectionData = await response.json();
      return collectionData;
    } else {
      throw new Error(`Error retrieving ${collectionName} data`);
    }
  } catch (error) {
    console.error(`Error fetching ${collectionName} data:`, error);
    throw error;
  }
};


export const fetchBaseWorkoutCollectionData = async (collectionName) => {
  try {
    // const baseUrl = process.env.REACT_APP_BASE_URL
    const baseUrl = "https://apex-lifter-backend.onrender.com"
    const response = await fetch(`${baseUrl}/${collectionName}`);
    if (response.ok) {
      const collectionData = await response.json();
      // Return the collection data
      return collectionData;
    } else {
      throw new Error(`Error retrieving ${collectionName} data`);
    }
  } catch (error) {
    console.error(`Error fetching ${collectionName} data:`, error);
    throw error;
  }
};


