import React, { useEffect, useState } from 'react'
import SectionMenu from '../../components/SectionMenu'
import classes from './index.module.css'
import { BsColumnsGap } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectListCourses,
  makeSelectLoading,
  makeSelectorLimitProds,
  makeSelectCategories,
  makeSelectNumberProds,
  makeSelectCheckCourse
}
  from './selectors'
import { useDispatch, useSelector } from "react-redux";
import {
  getListCoursesStart,
  getListCatStart
}
  from './actions'
import reducer from './reducer'
import saga from './saga'
import LeftSideBar from './components/LeftSideBar'
import ProductList from './components/CourseList'
const key = "coursesRoot"
const stateStructor = createStructuredSelector({
  products: makeSelectListCourses(),
  loading: makeSelectLoading(),
  limitProd: makeSelectorLimitProds(),
  categories: makeSelectCategories(),
  numberProds: makeSelectNumberProds(),
  checkCourse: makeSelectCheckCourse(),
})

const Products = () => {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const {
    products,
    loading,
    limitProd,
    categories,
    numberProds,
    checkCourse
  } = useSelector(stateStructor)
  const dispatch = useDispatch();

  const [listStatus, setListStatus] = useState([]);
  const [listSubject, setListSubject] = useState([]);

  const [showTypeProds, setShowTypeProds] = useState(true);
  const [cate, setCate] = useState("");
  const [keyValue, setKeyValue] = useState('');
  const [optionSort, setOptionSort] = useState('nameAZ')

  useEffect(() => {
    dispatch(getListCoursesStart({
      limit: limitProd,
      cate: cate,
      keyword: keyValue,
      sort: optionSort,
      subject: listSubject,
      status: listStatus,
    }))
  }, [cate, keyValue, optionSort, listStatus, listSubject])

  useEffect(() => {
    dispatch(getListCatStart(cate))
  }, [])

  const handleChangeCate = (value) => {
    setCate(value);
  }
  const getAllProducts = () => {
    dispatch(getListCoursesStart({
      limit: limitProd,
      cate: cate,
      keyword: keyValue,
      sort: optionSort
    }))
  }
  const handlerSearchKey = (e) => {
    e.preventDefault();
  }
  const handlerOnChangeKey = (e) => {
    setKeyValue(e.target.value);
  }
  const handlerOnChangeSort = (e) => {
    setOptionSort(e.target.value);
  }

  return (
    <div>
      <SectionMenu menuCurrent="Courses" />
      <div className={classes.content}>
        <div className="row">
          <LeftSideBar
            listStatus={listStatus}
            setListStatus={setListStatus}
            listSubject={listSubject}
            setListSubject={setListSubject}
            loading={loading}
            categories={categories}
            getAllProducts={getAllProducts}
            handleChangeCate={handleChangeCate}
            handlerSearchKey={handlerSearchKey}
            keyValue={keyValue}
            handlerOnChangeKey={handlerOnChangeKey} />
          <div className="col-10">
            <div className="container">
              <div className="row">
                <div className={`col-3 ${classes.hi}`}>
                  <span className={showTypeProds ? classes.hiActive : ""} onClick={() => setShowTypeProds(true)}><BsColumnsGap /></span>
                  <span className={!showTypeProds ? classes.hiActive : ""} onClick={() => setShowTypeProds(false)}><AiOutlineMenu /></span>
                  <p>{numberProds} Courses Found</p>
                </div>
                <div className="col-6">
                  <hr />
                </div>
                <div className={`col-3 ${classes.sortBy}`}>
                  <form >
                    <label htmlFor="sort">Sort by</label>
                    <select value={optionSort} onChange={handlerOnChangeSort} name="sort" id="sort" className={classes.sortInput}>
                      <option value="nameAZ">Name (A-Z)</option>
                      <option value="nameZA">Name (Z-A)</option>
                    </select>
                  </form>
                </div>
              </div>
              <ProductList
                loading={loading}
                products={products}
                showTypeProds={showTypeProds}
                checkCourse={checkCourse} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;
