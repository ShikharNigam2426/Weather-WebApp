// api.js
const fetchData = async (city) => {
    try {
        const key = '20487d8b159f07348f5497d74f8fd17e';

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();

        if (jsonData.list && jsonData.list[0] && jsonData.list[0].main) {
            return jsonData;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error
    }
};

export { fetchData };
