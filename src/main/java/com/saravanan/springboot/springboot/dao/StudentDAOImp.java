package com.saravanan.springboot.springboot.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.saravanan.springboot.springboot.modal.Student;

@Repository
public class StudentDAOImp implements StudentDAO {

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Student> get() {

		Session currSession = entityManager.unwrap(Session.class);
		Query<Student> query = currSession.createQuery("from Student", Student.class);
		List<Student> list = query.getResultList();
		return list;

	}

	@Override
	public Student get(int id) {
		Session currSession = entityManager.unwrap(Session.class);
		Student student = currSession.get(Student.class, id);
		return student;
	}

	@Override
	public void save(Student student) {

		Session currSession = entityManager.unwrap(Session.class);
		currSession.saveOrUpdate(student);

	}

	@Override
	public void delete(int id) {
		Session currSession = entityManager.unwrap(Session.class);
		Student student = currSession.get(Student.class, id);
		currSession.delete(student);

	}

}
