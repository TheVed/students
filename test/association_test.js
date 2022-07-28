const Student = require('../src/student');
const Comment = require('../src/comment');
const ArticleBlog = require('../src/articleBlog');
const assert = require('assert');

describe('Association Test',()=>{

  let jason, articleBlog, comment;

  beforeEach((done)=>{
    jason = new Student({name: 'Jason'});
    articleBlog = new ArticleBlog({title: 'Mocha', content: 'Javascript'});
    comment = new Comment({content: 'Bravo'});

    jason.articleBlog.push(articleBlog);
    articleBlog.comments.push(comment);
    comment.students = jason;

    Promise.all([jason.save(), articleBlog.save(), comment.save()])
    .then(()=>{
      done()
    })
  })

  // it('Association with ArticleBlog',(done)=>{
  //   Student.findOne({name: 'Jason'})
  //   .populate('articleBlog')
  //   .then((student)=>{
  //     assert(student.articleBlog[0].title === 'Mocha')
  //     done()
  //   })
  // })

  it.only('Nested Populate',(done)=>{
    Student.findOne({name: 'Jason'})
    .populate({
      path: 'articleBlog',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'students',
          model: 'student'
        }
      }
    })
    .then((student)=>{
      assert(student.name === 'Jason')
      assert(student.articleBlog[0].title === 'Mocha')
      assert(student.articleBlog[0].comments[0].content === 'Bravo')
      assert(student.articleBlog[0].comments[0].students.name === 'Jason')
      done()
    })
  })

})
