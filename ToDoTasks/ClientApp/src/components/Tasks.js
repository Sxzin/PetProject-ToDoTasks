import { useEffect, useState } from "react";
import "./Tasks.css";
import { IoCloseCircleSharp} from 'react-icons/io5';
import ModalButton from "./ModalBtn";


const URL = '/api/tasks';

const Tasks = () => {
    const [allTasks, setTasks] = useState([]);
    const [nameTask, setNameTask] = useState('');
    const [description, setDescription] = useState('');
 
    const getTasks = async () => {
        const result = await fetch(URL);
        if (result.ok) {
            const tasks = await result.json();
            setTasks(tasks);
        }
    }

    const addTasks = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nameTask,
                description,
            }),
        };

        const result = await fetch(URL, options);
        if (result.ok) {
            const task = await result.json();
            setTasks(prevTasks => [task, ...prevTasks]);
            setNameTask('');
            setDescription('');
        }

    }

    const deleteTasks = async (id) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        await fetch(`${URL}/${id}`, options);
        setTasks(allTasks.filter(x => x.id !== id));
    }

    const updateTasks = async (oldTask) => {
    
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(oldTask),
        };

        const result = await fetch(URL, options);
        if (result.ok) {
            const task = await result.json();
            const updatedTask = allTasks.findIndex(x => x.id === oldTask.id)
           allTasks[updatedTask] = task;
           setTasks(allTasks.slice());

        } 

    };

    const [allWeather, setWeather] = useState({});
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState('');


    
    
  
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setLatitude(lat);
                    setLongitude(lon);
                    getCityName(lat, lon);
                },
            );
        }
      }, []);


    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const URL3 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0473a2a932a1e9af40eb50c1d91d0b6b&units=metric`;
            const getWeather = async () => {
               
                    const result = await fetch(URL3);
                    if (result.ok) {
                        const weatherData = await result.json();
                        setWeather(weatherData);
                    }

            };
    
            getWeather();
        }
    }, [latitude, longitude]);

      const getCityName = async (lat, lon) => {
        
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=0473a2a932a1e9af40eb50c1d91d0b6b`);
        if (response.ok) {
            const data = await response.json();
            const cityName = data[0]?.name;
            setCity(cityName);
        }

      };
    
    const { main, weather } = allWeather;
    const temperature = main?.temp;
    const weatherCondition = weather?.[0]?.main;
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div>
            <div>
            <h2>Weather Data at Your Location ({city})</h2>
            <p>Time: {hours}:{minutes}</p>
            <p>Current Date: {day}.{month}.{year}</p>   
            <p>Temperature: {temperature}&deg;C</p>
            <p>Weather Condition: {weatherCondition}</p>
            
        </div>
            <div className="tasks">
                <input
                    placeholder="Task"
                    value={nameTask}
                    onChange={e => setNameTask(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button onClick={() => addTasks()}>Add</button>
            </div>
            <div>
                {allTasks.map(x => (
                    <TaskItem
                        key={x.id}
                        task={x}
                        deleteAction={deleteTasks}
                        updateAction={updateTasks}
                    />
                ))}
            </div>
        </div>
    );
};


const TaskItem = ({ task, deleteAction, updateAction}) => {


    const confirmDelete = () => {
        const shouldDelete = window.confirm('Ви впевнені, що хочете видалити це завдання?');
        if (shouldDelete) {
            deleteAction(task.id);
        }
    };

    return (
        <div className="user">
            <IoCloseCircleSharp className="delete-icon" onClick={confirmDelete} />
            <h4>{task.nameTask}</h4>
            <p>{task.description}</p>
            <ModalButton
                btnName={'Update'}
                title={'Update task'}
                modalContent={
                    <div>
                         <div>   
                        <input
                            placeholder="Task"
                            defaultValue={task.nameTask}
                            onChange={e => task.nameTask = e.target.value}
                        />
                        </div> 
                        <div>
                        <textarea
                            placeholder="Description"
                            defaultValue={task.description}
                            onChange={e => task.description = e.target.value}
                        />
                        </div> 
                        <button onClick={() => updateAction(task)}>Update</button>
                    </div>
                }
            />
        </div>
    );
};

export default Tasks;


// const URL = '/api/tasks';

// const Tasks = () =>{

//     const [allTasks,setTasks] = useState([]);

//     const getTasks = async () =>{
//         const options = {
//             method: 'GET'
//         }
//         const result = await fetch(URL, options)
//         if(result.ok){
//            const tasks = await result.json();
//            setTasks(tasks)
//            return tasks;
//         }
//         return [];
//     }

//     const nameTaskFromUser = document.querySelector('#nameTask').value;
//     const descriptionFromUser = document.querySelector('#description').value;

//     const addTasks = async () =>{
//         const options = {
//             method: 'Post',
//             body: JSON.stringify({
//                 nameTask: nameTaskFromUser,
//                 description: descriptionFromUser  
//             })
//         }
//         const result = await fetch(URL, options)
//         if(result.ok){
//            const task = await result.json();
//            allTasks.push(task);
//            setTasks(allTasks.slice());
//         }
//     }




//     useEffect(() =>{
//         getTasks();
//     },[])



//     return(
//         <div>
//         <form>
//             <input placeholder="Задача" id="nameTask"/>
//             <textarea placeholder="Опис" id="description"/>
//             <button type="button" onClick={() => addTasks()}>Додати</button>
//         </form>
//         <div>
//             {allTasks.map(x =><TaskItem key={x.id} id={x.id} nameTask={x.nameTask} description={x.description}/>)}
//         </div>
//         </div>
//     )
// }
// export default Tasks;

// const TaskItem = ({id,nameTask,description}) =>{
//     return(
//         <div className="user">
//         <h4>{nameTask}</h4> 
//         <p>{description}</p>
//         </div>
//     )
// }