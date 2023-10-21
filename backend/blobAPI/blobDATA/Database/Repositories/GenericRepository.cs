using blobCORE.Entities;
using Microsoft.EntityFrameworkCore;

namespace blobDATA.Database.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
{
    private readonly BlobContext context;
    private readonly DbSet<T> entities;

    public GenericRepository(BlobContext context)
    {
        this.context = context;
        entities = this.context.Set<T>();
    }

    public IQueryable<T> GetAll()
    {
        return entities;
    }

    public T Get(Guid id)
    {
        return entities.SingleOrDefault(s => s.Id == id);
    }

    public void Insert(T entity)
    {
        if (entity == null) throw new ArgumentNullException("entity");
        entities.Add(entity);
        context.SaveChanges();
    }

    public void Update(T entity)
    {
        if (entity == null) throw new ArgumentNullException("entity");
        context.SaveChanges();
    }

    public void Delete(T entity)
    {
        if (entity == null) throw new ArgumentNullException("entity");
        entities.Remove(entity);
        context.SaveChanges();
    }
}