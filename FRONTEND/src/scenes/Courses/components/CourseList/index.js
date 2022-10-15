import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom'
import classes from '../../index.module.css'
import { Modal } from 'antd';
import { Form, Input } from 'antd';
import axios from 'axios'
import { useHistory } from "react-router-dom";

import {
  checkCourseCodeSuccess
}
  from '../../actions'

import { useDispatch } from 'react-redux';

const ProductList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [errorText, setErrorText] = useState(false);

  const [form] = Form.useForm();
  const inputRef = useRef();
  const {
    loading,
    showTypeProds,
    products,
  } = props

  const showModal = (id) => {
    setCourseId(id);
    setIsModalVisible(true);
  };

  const handleOk = async (id) => {
    setErrorText(false);
    // dispatch(checkCourseCodeStart({ id: courseId, courseCode: inputRef.current.input.value }))
    try {
      const course = await axios({
        method: 'post',
        url: "http://localhost:3002/api/v1/course/detail",
        headers: {},
        data: {
          id: courseId,
          courseCode: inputRef.current.input.value
        }
      });
      if (course.data.course) {
        dispatch(checkCourseCodeSuccess(course))
        setIsModalVisible(false);
        form.setFieldsValue({
          code: ''
        });
        history.push(`/courses/${courseId}`);
      }
      else {
        setErrorText(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log(inputRef.current)
    setErrorText(false);
    setIsModalVisible(false);
    form.setFieldsValue({
      code: ''
    });
  };

  return (
    <div className="row" style={{ marginTop: "30px" }}>
      {loading ? <div className="col-12">Loading ...</div> : (
        products.map((item) => {
          if (showTypeProds) {
            return (
              <div className="col-4" key={item._id}>
                <Modal title="Enter course code" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <Form form={form}>
                    <Input placeholder="Code" ref={inputRef}  name="code"/>
                  </Form>
                  {errorText && <p style={{ color: 'red' }}>Wrong code</p>}
                </Modal>
                <div className={`card ${classes.item}`} style={{ width: "18rem" }}>
                  <div onClick={() => showModal(item.course_id)}>
                    <img src={item.thumbnail} className="card-img-top" alt="..." />
                  </div>
                  <div className="card-body">
                    <h4 className="card-text" style={{ fontSize: '15px' }}>{item.course_name}</h4>
                    <p style={{ color: "#ab7a5f" }}>{item.class} - {item.status}</p>
                  </div>
                </div>
              </div>
            )
          }
          else
            return (
              <div className="col-12" key={item._id}>
                <div className={`row ${classes.item2}`}>
                  <div className={`col-4 ${classes.image2}`}>
                    <img src={item.image} alt="..." />
                  </div>
                  <div className="col-8">
                    <h4 className="card-text" style={{ fontSize: '25px' }}>{item.title}</h4>
                    <p style={{ color: "#ab7a5f" }}>{item.price}$</p>
                    <p>{item.description}</p>
                    <NavLink to={`/products/${item.id}`} className={classes.btn}>Details</NavLink>
                  </div>
                </div>
              </div>
            )
        }))
      }
    </div>
  )
}

export default React.memo(ProductList, (prev, next) => {
  if (prev.products !== next.products) return false
  if (prev.showTypeProds !== next.showTypeProds) return false
  return true;
})
