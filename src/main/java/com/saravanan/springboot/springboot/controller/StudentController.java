package com.saravanan.springboot.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saravanan.springboot.springboot.modal.Student;
import com.saravanan.springboot.springboot.service.StudentService;

@RestController
@RequestMapping("/api")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@GetMapping("/student")
	public List<Student> get() {
		return studentService.get();
	}

	@PostMapping("/student")
	public Student save(@RequestBody Student student) {
		studentService.save(student);
		return student;
	}

	@GetMapping("/student/{id}")
	public Student get(@PathVariable int id) {
		return studentService.get(id);
	}

	@DeleteMapping("/student/{id}")
	public String delete(@PathVariable int id) {

		studentService.delete(id);

		return "Student removed with id " + id;

	}

	@PutMapping("/student")
	public Student update(@RequestBody Student student) {
		studentService.save(student);
		return student;
	}

}
