export const fetchUserCollectionData = async (collectionName, userId = null) => {
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


