package com.example.demo.student;

import com.example.demo.exceptoins.BadRequestException;
import com.example.demo.exceptoins.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        //check if email is taken
        if(studentRepository.selectExistsEmail(student.getEmail())){
            throw new BadRequestException("Email Taken");
        }
        studentRepository.save(student);

        //Retorno
        Student std = null;
        if(studentRepository.findById(student.getId()).isPresent()){
            std = studentRepository.findById(student.getId()).get();
        }
        return std;

    }

    public void deleteStudent(Long studentId) {
        //Check is student exists
        if(!studentRepository.existsById(studentId)){
            throw new StudentNotFoundException("Student not found");
        }
        studentRepository.deleteById(studentId);
    }
}
