package todo.repository;
import todo.entity.todoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface todoRepository extends JpaRepository<todoEntity, Long> {

}
