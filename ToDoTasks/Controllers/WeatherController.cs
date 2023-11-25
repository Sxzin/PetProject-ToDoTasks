using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ToDoTasks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {

        [HttpGet]
        public IActionResult GetWeather()
        {
            string url = "https://api.openweathermap.org/data/2.5/weather?lat=40.7128&units=metric&lon=-74.0060&appid=0473a2a932a1e9af40eb50c1d91d0b6b";

                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                using (HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse())
                {
                    using (StreamReader streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
                    {
                        string response = streamReader.ReadToEnd();
                        return Ok(response);
                    }
                }

        }




    }
}
