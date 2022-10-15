import React, { useEffect, useState, useRef } from 'react'
import {
  useParams
} from "react-router-dom";
import SectionMenu from '../../../../components/SectionMenu';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectLoading,
  makeSelectCourseDetail,
  makeSelectLessons
}
  from '../../selectors'
import {
  checkCourseCodeStart,
  getListLessonStart
}
  from '../../actions';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';

import { Collapse } from 'antd';
import { Card } from 'antd';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from '../../../../redux/reduxInjectors';
import reducer from '../../reducer';
import saga from '../../saga';
import styled from 'styled-components';

const stateStructor = createStructuredSelector({
  courseDetail: makeSelectCourseDetail(),
  loading: makeSelectLoading(),
  lessons: makeSelectLessons(),
})

const key = "coursesRoot";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Container = styled.section`
  padding: 50px 0px;
  width: 95%;
  margin: 0 auto;
`
const Content = styled.div`
  display: flex;
  justify-content: flex-start,
  align-items: center
`
const CourseDetail = () => {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const dispatch = useDispatch();
  let { id } = useParams();
  const folderNameRef = useRef();

  const {
    courseDetail,
    lessons,
    loading
  } = useSelector(stateStructor)

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    if (id !== null) {
      dispatch(checkCourseCodeStart({
        id,
        courseCode: null
      }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id !== null) {
      dispatch(getListLessonStart(id));
    }
  }, [dispatch, id]);

  const handlerCreateFolder = () => {
    const name = folderNameRef.current.input.value;
    dispatch()
  }

  return (
    <div>
      <SectionMenu menuCurrent={`Course / ${courseDetail.course_name} - ${courseDetail.class}`} />
      <Container>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Tab 1" key="1">
            <Container>
              <div className="row">
                <div className='col-9'>
                  <Collapse defaultActiveKey={['1']} onChange={onChange}>
                    {lessons && lessons.length && lessons.map((le, key) => {
                      return (
                        <Panel header={`Lesson ${key + 1}: ${le.lesson_name}`} key={key + 1}>
                          <Content>
                            <img
                              width={30}
                              height={25}
                              src='../assets/image/slides-icon.png'
                              alt={`slide for lesson ${key + 1}`}
                            />
                            <p>
                              <a href={le.pdf_file_link} target='_blank' rel="noopener noreferrer">Slides for Lesson {key + 1}</a>
                            </p>
                          </Content>
                        </Panel>
                      )
                    })}
                  </Collapse>
                </div>
                <div className='col-3'>
                  <Card
                    title="Overview"
                  >
                    <img src={courseDetail.thumbnail} className="card-img-top" alt="..." />
                    <div>
                      <p>Start date: {courseDetail.start_date}</p>
                      <p>End date: {courseDetail.end_date}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </Container>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal">
              <Form.Item
                label="Folder name"
                name="folder"
                rules={[{ required: true, message: 'Please input your folder!' }]}
              >
                <Input ref={folderNameRef}/>
              </Form.Item>
              <Form.Item label="Create folder">
                <Button type="primary" onClick={handlerCreateFolder}>Submit</Button>
              </Form.Item>
            </Form>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Form.Item label="DatePicker">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Upload" valuePropName="fileList">
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="TextArea">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Upload file">
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Container>
    </div>
  )
}

export default CourseDetail;