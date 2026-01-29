package com.saravanan.springboot.springboot.service;

import java.util.List;

import com.saravanan.springboot.springboot.modal.Student;

public interface StudentService {

	List<Student> get();

	Student get(int id);

	void save(Student student);

	void delete(int id);

}
