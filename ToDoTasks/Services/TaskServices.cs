using ToDoTasks.Data;
using ToDoTasks.Services.Interfaces;

namespace ToDoTasks.Services
{
    public class TaskServices : ITaskServices
    {
        private ApplicationDbContext _dataContext;
        public TaskServices(ApplicationDbContext dataContext)
        {
            _dataContext = dataContext;
        }

        public Models.Task Create(Models.Task model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            _dataContext.Tasks.Add(model);
            _dataContext.SaveChanges();

            return model;
        }

        public Models.Task Update(Models.Task model)
        {
            var modelToUpdate = _dataContext.Tasks.FirstOrDefault(x => x.Id == model.Id);
            modelToUpdate.NameTask = model.NameTask;
            modelToUpdate.Description = model.Description;
            _dataContext.SaveChanges();

            return modelToUpdate;
        }

        public void Delete(int id)
        {
            var modelToDelete = _dataContext.Tasks.FirstOrDefault(x => x.Id == id);
            _dataContext.Tasks.Remove(modelToDelete);
            _dataContext.SaveChanges();
        }

        public Models.Task Get(int id)
        {
            return _dataContext.Tasks.FirstOrDefault(x => x.Id == id);
        }

        public List<Models.Task> Get()
        {

            List<Models.Task> tasks = _dataContext.Tasks.ToList();
            return tasks;
        }
    }
}
