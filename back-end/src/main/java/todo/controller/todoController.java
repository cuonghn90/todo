package todo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import todo.entity.todoEntity;
import todo.service.todoService;

@RestController
@RequestMapping("/todo")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class todoController {
	private todoService todoSer;
	
	@GetMapping()
	public List<todoEntity> getAllTodo(){
		return todoSer.getAllTodo();
	}
	@GetMapping("/done")
	public List<todoEntity> getAllTodoDone(){
		return todoSer.getAllTodoDone();
	}
	@PostMapping()
	public String addTodo(@RequestParam("textTodo") String textTodo) {
		todoSer.addTodo(textTodo);
		return "add success";
	}
	@PostMapping("/{id}")
	public String doneTodo(@PathVariable("id") Long id) {
		todoSer.doneTodo(id);
		return "add done success";
	}
	@PutMapping("/{id}")
	public String editTodo(@PathVariable("id") Long id,@RequestParam("textTodo") String textTodo) {
		todoSer.editTodo(id,textTodo);
		return "edit success";
	}
	@DeleteMapping("/{id}")
	public String deleteTodo(@PathVariable("id") Long id) {
		todoSer.deleteTodo(id);
		return "delete success";
	}
	@GetMapping("/{id}")
	public todoEntity getOneTodo(@PathVariable("id") Long id) {
		return todoSer.getOneTodo(id);
	}
}
