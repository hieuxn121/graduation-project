import React, { useState } from 'react'
import classes from '../../index.module.css'
import { Checkbox, Row } from 'antd';
import { useDispatch } from "react-redux";

const status = [
  { label: 'Getting Started', value: 'Getting Started' },
  { label: 'Studying', value: 'Studying' },
  { label: 'Finished', value: 'Finished' },
];

const LeftSideBar = (props) => {
  const {
    listStatus,
    setListStatus,
    listSubject,
    setListSubject,
    loading,
    categories,
    handlerSearchKey,
    keyValue,
    handlerOnChangeKey
  } = props
  const dispatch = useDispatch();

  const onChangeStatus = (status) => {
    setListStatus(status);
  };

  const onChangeSubject = (subjects) => {
    setListSubject(subjects);
  }

  return (
    <div className={`col-2 ${classes.filterProd}`}>
      <form onSubmit={(e) => handlerSearchKey(e)}>
        <input
          value={keyValue}
          onChange={(e) => handlerOnChangeKey(e)}
          className={`form-control mr-sm-2 ${classes.filter}`}
          type="search" placeholder="Search" aria-label="Search" />
      </form>
      <div className={classes.formControl}>
        <h5>Subject</h5>
        <div>
          {loading ? <div className="col-12">Loading ...</div> : (
            <Checkbox.Group onChange={onChangeSubject}>
              {categories.map((item, key) => (
                <Row><Checkbox onChange={onChangeSubject} value={item.cate_name} key={key}>{item.cate_name}</Checkbox></Row>
              ))}
            </Checkbox.Group>
          )
          }
        </div>
      </div>
      <div className={classes.formControl}>
        <h5>Status</h5>
        <Checkbox.Group onChange={onChangeStatus}>
          {status.map(e => (
            <Row><Checkbox value={e.value} key={e.label}>{e.label}</Checkbox></Row>
          ))}
        </Checkbox.Group>
      </div>
      <div className={classes.formControl}>
        <button className="btn btn-danger">Clear Filter</button>
      </div>
    </div>
  )
}

export default React.memo(LeftSideBar, (prevProps, nextProps) => {
  if (prevProps.categories !== nextProps.categories)
    return false;
  if (prevProps.keyValue !== nextProps.keyValue)
    return false;
  return true;
}) 
