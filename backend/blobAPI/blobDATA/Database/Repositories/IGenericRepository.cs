using System.Linq.Expressions;
using blobCORE.Entities;

namespace blobDATA.Database.Repositories;

public interface IGenericRepository<T> where T : BaseEntity
{
    IQueryable<T> GetAll();
    T Get(Guid id);
    void Insert(T entity);
    void Update(T entity);
    void Delete(T entity);
    T? FilterSingle(Expression<Func<T, bool>> predicate);
}