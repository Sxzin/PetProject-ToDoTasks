namespace ToDoTasks.Services.Interfaces
{
    public interface ITaskServices
    {
        Models.Task Create(Models.Task model);

        Models.Task Update(Models.Task model);

        Models.Task Get(int id);

        List<Models.Task> Get();

        void Delete(int id);
    }
}
