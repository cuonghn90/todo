package todo.entity;

import javax.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "todo")
@Setter
@Getter
@AllArgsConstructor
public class todoEntity {
    
	@Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @Column(name = "text_todo")
    private String textTodo;

    @Column(name = "status")
    private String status;
    public todoEntity() {
    	
    }
    public todoEntity(String textTodo,String status) {
		this.textTodo = textTodo;
		this.status = status;
	}
    
}