package todo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import todo.entity.todoEntity;
import todo.repository.todoRepository;

@Service
@AllArgsConstructor
public class todoService {
	private todoRepository todoRepo;
//	private todoEntity todoEntity;
	public List<todoEntity> getAllTodo() {
		return todoRepo.findAll();
	}
	public void addTodo(String textTodo) {
		todoEntity todo = new todoEntity(textTodo,"working");
		todoRepo.save(todo);
	}
	public void editTodo(Long id, String textTodo) {
		Optional<todoEntity> todo = todoRepo.findById(id);
		if(todo.isPresent()) {
			todoEntity newTodo = todo.get();
			newTodo.setTextTodo(textTodo);
			todoRepo.save(newTodo);
		}
	}
	public void deleteTodo(Long id) {
		todoRepo.deleteById(id);
	}
	public todoEntity getOneTodo(Long id) {
		Optional<todoEntity> todo = todoRepo.findById(id);
		todoEntity todo1 = todo.get();
		return todo1;
	}
	public void doneTodo(Long id) {
		Optional<todoEntity> todo = todoRepo.findById(id);
		todoEntity todo1 = todo.get();
		todo1.setStatus("done");
		todoRepo.save(todo1);
	}
	public List<todoEntity> getAllTodoDone(){
		List<todoEntity> listTodo = todoRepo.findAll();
		List<todoEntity> listTodoDone = new ArrayList<>();
		for(int i = 0; i<listTodo.size() ; i++) {
			if(listTodo.get(i).getStatus().equals("done")) {
				todoEntity todo = listTodo.get(i);
				listTodoDone.add(todo);
			}
			
		}
		return listTodoDone;
	}
}
