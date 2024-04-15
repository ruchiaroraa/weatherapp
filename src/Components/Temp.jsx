import React, { useEffect, useState } from 'react';

const Temp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");
    const [error, setError] = useState(null);
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=fa1973db90995c241b1219e1dcf49b10`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const resJson = await response.json();
                setCity(resJson);
                setError(null);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchApi();
    }, [search]);

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        setIsDay(hours >= 6 && hours < 18);
    }, []);

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2);
    };

    const getBackgroundImage = () => {
        if (!city) return isDay ? 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_k-QHRoXj0GntfWIcAOFbRa5fcJvTL845qb6XYoPRQ&s)' :
            'url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg)';
        const weather = city.weather[0].main.toLowerCase();
        switch (weather) {
            case 'clear':
                return 'url(https://static.toiimg.com/thumb/msid-99612775,width-1280,height-720,resizemode-4/99612775.jpg)';
            case 'clouds':
                return 'url(https://images.nzgeo.com/1995/04/26_Clouds_Header01-2000x1301.jpg)';
            case 'rain':
                return 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrPLfddYuXQIqZaMbN1mV4AxLaJUo46geV6-3BzqVQ8OXxziv7PC_aZMRdnzH6ntoTjqU&usqp=CAU)';
            case 'snow':
                return 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2V5Yb-dIS5Mg3DER8E2-SFcURF7FfBfX1NGrWrncphA&s)';
            default:
                return isDay ? 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_k-QHRoXj0GntfWIcAOFbRa5fcJvTL845qb6XYoPRQ&s)' :
                    'url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg)';
        }
    };

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: getBackgroundImage() }}
        >
            <div className='w-[65vh] h-[60vh] bg-white bg-opacity-50 backdrop-blur-lg px-4 py-10'>
                <input
                    className='border-2 block px-3 py-2 mb-4 rounded-sm mx-auto'
                    type='search'
                    placeholder='Search for a city...'
                    onChange={(event) => { setSearch(event.target.value) }}
                />

                {error && <p>{error}</p>}
                {!city ? (
                    <p>No Data Found</p>
                ) : (
                    <div className="text-center">
                        <div className="mb-4">
                            <img
                                src="https://cdn-icons-png.freepik.com/512/2562/2562392.png"
                                alt="Weather Icon"
                                className="w-16 h-16 mr-2 inline-block"
                            />
                        </div>
                        <h2 className='text-4xl text-gray-900 font-bold mb-4'>{search}</h2>
                        <h1 className='text-6xl text-gray-900 font-bold mb-4'>{kelvinToCelsius(city.main.temp)}°C</h1>
                        <h3 className='text-lg text-gray-700 font-semibold mb-2'>{kelvinToCelsius(city.main.temp_min)}°C / {kelvinToCelsius(city.main.temp_max)}°C</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Temp;
