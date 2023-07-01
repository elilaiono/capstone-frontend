export const fetchUserCollectionData = async (collectionName, userId) => {
  try {
    const response = await fetch(`http://localhost:8080/${collectionName}/${userId}`);
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

export const fetchUserWorkoutCollectionData = async (collectionName, subCollectionName = null, userId = null) => {
  try {
    let url = `http://localhost:8080/${collectionName}/${subCollectionName}/${userId}`;

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
    const response = await fetch(`http://localhost:8080/${collectionName}`);
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


