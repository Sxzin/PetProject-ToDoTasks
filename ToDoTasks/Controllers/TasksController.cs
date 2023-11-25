using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDoTasks.Services.Interfaces;

namespace ToDoTasks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private ITaskServices _tasksService;

        public TasksController(ITaskServices tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpPost]
        public Models.Task Create(Models.Task model)
        {
            return _tasksService.Create(model);
        }

        [HttpPatch]
        public Models.Task Update(Models.Task model)
        {
            return _tasksService.Update(model);
        }

        [HttpGet("{id}")]
        public Models.Task Get(int id)
        {
            return _tasksService.Get(id);
        }

        [HttpGet]
        public IEnumerable<Models.Task> GetAll()
        {
            return _tasksService.Get();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tasksService.Delete(id);

            return Ok();
        }
    }
}
