import React, { useEffect, useRef, useState } from 'react'
import { apiLoggedInInstance } from '../../utils/api';
import { DemoModal } from '../../components/Modal1';
import { USER_TYPE } from '../../constants/userType';
import { Formik } from 'formik';

const QuanTriThanhVien = () => {
    // ref
    const inputFileRef = useRef();


    //state lưu data
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    // filter 
    const [filterData, setFilterData] = useState({
        address: null,
        birthday_start: null,
        birthday_end: null,
        email: null,
    })
    // form
    const [step, setStep] = useState(1); // 1 - chọn vai trò, 2 - nhập thông tin
    const [role, setRole] = useState(USER_TYPE.MANAGER);
    const [nganhNghe, setNganhNghe] = useState([]);
    const [tempAvatar, setTempAvatar] = useState(null)

    const searchUser = () => {
        apiLoggedInInstance({
            url: '/api/admin/user',
            params: {
                page_index: pageIndex,
                page_size: pageSize,
                ...filterData
            }
        }).then(response => {
            const { data: userData, headers } = response //
            //lưu data vào state
            setData(userData);
            // tính tổng số trang
            const { totalelement } = headers;
            setTotalPage(Math.ceil(totalelement / pageSize));
        })
    }

    // Hàm đóng modal tạo
    const onCloseModalCreate = () => {
        setShowModal(false);
        if (step === 2) {
            setStep(1);
        }
    }

    const handleCreateUser = (values) => {
        apiLoggedInInstance({
            url: '/api/admin/user',
            method: "POST",
            data: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res=> {
            if(res.data){
                alert("Tao thanh cong")
            }
        })
    }

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append("upload",file)
        apiLoggedInInstance({
            url: '/api/file/upload',
            method: "POST",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res=> {
            console.log(res);
        })
    }

    // Lấy ra thông tin user
    useEffect(() => {
        searchUser()
    }, [pageIndex, pageSize])

    // lấy ra thông tin ngành nghề
    useEffect(() => {
        apiLoggedInInstance({
            url: "/api/field",
        }).then(res => {
            setNganhNghe(res.data);
        })
    },[])


    return (
        <div>
            <div className='w-full flex justify-between items-center'>
                <div>Quản trị thành viên ()</div>
                <div>
                    <button onClick={() => {
                        setShowModal(true)
                    }}>Thêm thành viên</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>(*)</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <button onClick={() => {
                                searchUser();
                            }}>Tìm kiếm</button>
                        </th>
                        <th></th>
                        <td><input type='text' placeholder='Số điện thoại' onChange={(e) => {
                            setFilterData(pre => ({ ...pre, phone: e.target.value }))
                        }} /></td>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {data.map((user, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td></td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.gender}</td>
                            <td>{user.birthday}</td>
                        </tr>
                    ))}
                    <tfoot>
                        <tr>
                            <td>
                                {[...Array(totalPage)].map((_, i) => (
                                    <button onClick={() => {
                                        setPageIndex(i)
                                    }} className='px-2 py-1 border'>{i + 1}</button>
                                ))}
                            </td>
                        </tr>
                    </tfoot>
                </tbody>
            </table>
            {showModal && (
                <DemoModal title="Thêm thành viên" onClose={() => { onCloseModalCreate() }}>
                    {/* Bước 1: Chọn vai trò */}
                    {step === 1 && (
                        <>
                            <div className='w-full flex justify-between'>
                                <div className='cursor-poiner' onClick={() => {
                                    setRole(USER_TYPE.MANAGER)
                                }}>
                                    <input type='radio' checked={role === USER_TYPE.MANAGER} name='role' value={USER_TYPE.MANAGER} />
                                    <span>Quản lý</span>
                                </div>
                                <div className='cursor-poiner' onClick={() => {
                                    setRole(USER_TYPE.TEACHER)
                                }}>
                                    <input type='radio' checked={role === USER_TYPE.TEACHER} name='role' value={USER_TYPE.TEACHER} />
                                    <span>Giáo viên</span>
                                </div>
                                <div className='cursor-poiner' onClick={() => {
                                    setRole(USER_TYPE.STUDENT)
                                }}>
                                    <input type='radio' checked={role === USER_TYPE.STUDENT} name='role' value={USER_TYPE.STUDENT} />
                                    <span>Sinh viên</span>
                                </div>
                            </div>
                            <div className='flex justify-end items-center'>
                                <button onClick={() => {
                                    onCloseModalCreate()
                                }}>Huỷ</button>
                                {step === 1 ? (
                                    <button onClick={() => {
                                        setStep(2);
                                    }}>Tiếp Tục</button>
                                ) : (
                                    <button>Thêm</button>
                                )}
                            </div>
                        </>

                    )}
                    {/* Nhập form */}
                    {step === 2 && (
                        <div>
                            <Formik
                                initialValues={{
                                    address: "",
                                    avatar: "",
                                    birthday: "",
                                    classId: 0,
                                    courseId: 0,
                                    email: "",
                                    enabled: true,
                                    fieldId: 0,
                                    fullName: "",
                                    gender: 0,
                                    note: "",
                                    password: "",
                                    phone: "",
                                    studentCode: "",
                                    teacherType: true,
                                    type: role,
                                    username: ""
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.username) {
                                        errors.username = 'Không được để trống';
                                    }
                                    if (!values.password) {
                                        errors.password = 'Không được để trống';
                                    }
                                    if (!values.fullName) {
                                        errors.fullName = 'Không được để trống';
                                    }
                                    if (!values.email) {
                                        errors.email = 'Không được để trống';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Email không đúng định dạng';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    handleCreateUser(values)
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            {/* Avatar, Tài khoản mật khẩu */}
                                            <div className='w-full flex justify-between'>
                                                <div className='w-1/2'>
                                                    <div className='w-[100px] h-[100px] border' onClick={() => {
                                                        inputFileRef.current?.click();
                                                    }}>
                                                        <img src={tempAvatar} alt='avatar'/>
                                                    </div>
                                                   <input ref={inputFileRef} onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        uploadFile(file)
                                                        const urlImage = URL.createObjectURL(file);
                                                        setTempAvatar(urlImage);
                                                   }} type='file' hidden/>

                                                </div>
                                                <div className='w-1/2'>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Tài khoản</div>
                                                        <input name='username' className='w-full px-2 py-1 border'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.username}
                                                            placeholder='Tài khoản' />
                                                        {errors.username && <span className='text-xs text-[red]'>{errors.username}</span>}
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Mật khẩu</div>
                                                        <input name='password'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                            type='password' className='w-full px-2 py-1 border' placeholder='Mật khẩu' />
                                                        {errors.password && <span className='text-xs text-[red]'>{errors.password}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Thông tin liên hệ  */}
                                            <div className='w-full flex justify-between'>
                                                <div className='w-1/2'>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Họ và tên</div>
                                                        <input name="fullName" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.fullName} className='w-full px-2 py-1 border' placeholder='Tài khoản' />
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Ngày sinh</div>
                                                        <input type='date' name='birthday' onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.birthday} className='w-full px-2 py-1 border' placeholder='Nganhf sinh' />
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Email</div>
                                                        <input type='email' name='email' onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email} className='w-full px-2 py-1 border' placeholder='Email' />
                                                    </div>
                                                </div>
                                                <div className='w-1/2'>
                                                    <div className='w-full flex items-center'>
                                                        <div className='w-1/2'>Giới tính</div>
                                                        <div className='flex items-center gap-x-2'>
                                                            <input name='gender' type='radio' value={0} /> <span>Nam</span>
                                                            <input name='gender' type='radio' value={1} /> <span>Nữ</span>
                                                            <input name='gender' type='radio' value={2} /> <span>Khác</span>
                                                        </div>
                                                    </div>
                                                    <div className='w-full'>
                                                        <div className='w-full'>Số điện thoại</div>
                                                        <input name='phone' onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.phone} className='w-full px-2 py-1 border' placeholder='Số điện thoại' />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Dựa vào role */}
                                            {role === USER_TYPE.MANAGER && (
                                                <div>
                                                    <div>
                                                        <div>Học và làm việc tại</div>
                                                        <input placeholder='Nhập thông tin' />
                                                    </div>
                                                    <div>
                                                        <div>Ghi chú</div>
                                                        <textarea name='note' className='w-full' placeholder='Nhập thông tin' />
                                                    </div>
                                                </div>
                                            )}
                                            {role === USER_TYPE.TEACHER && (
                                                <div>
                                                    <div className='w-full flex items-center justify-between'>
                                                        <div className='w-1/2'>
                                                            <div>Hình thức</div>
                                                            <select onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.teacherType} name='teacherType' className='w-full border px-2 py-1'>
                                                                <option value={true}>Cơ hữu</option>
                                                                <option value={false}>Thỉnh giảng</option>
                                                            </select>
                                                        </div>
                                                        <div className='w-1/2'>
                                                            <div>Chuyên ngành</div>
                                                            <select onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.courseId} name="courseId" className='w-full border px-2 py-1'>
                                                                {nganhNghe.map((f, i) => (
                                                                    <option value={f.id} key={f.id}>{f.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>Ghi chú</div>
                                                        <textarea name='note' className='w-full' placeholder='Nhập thông tin' />
                                                    </div>
                                                </div>
                                            )}
                                            {/* Tương tự */}
                                        </div>
                                        {/* Render Action */}
                                        <div className='flex justify-end items-center'>
                                            <button onClick={() => {
                                                onCloseModalCreate()
                                            }}>Huỷ</button>
                                            <button type="submit" disabled={isSubmitting}>Thêm</button>

                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    )}

                </DemoModal>
            )}
        </div>
    )
}

export default QuanTriThanhVien