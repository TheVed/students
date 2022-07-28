const assert = require('assert');
const Student = require('../src/student');

describe('validation',()=>{

  it('name is required',()=>{
    const student = new Student({name: undefined});
    const result = student.validateSync()
    const {message} = result.errors.name;
    assert(message === 'Name is required')
  })

  it('name is too short',()=>{
    const newStudent = new Student({name: 'Ve'});
    const newResult = newStudent.validateSync();
    const {message} = newResult.errors.name;
    assert(message === 'Name is too short')
  })

  it('prevent invalid records',(done)=>{
    const student = new Student({name: 'Em'});
    student.save()
    .catch((validationResult)=>{
      const {message} = validationResult.errors.name;
      assert(message === 'Name is too short');
      done();
    })
  })

})
