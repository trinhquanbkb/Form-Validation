import React, { Component } from 'react'
import './UserProfile.css'
import Swal from 'sweetalert2'

export default class UserProfile extends Component {
    state = {
        values: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        error: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }

    handleOnChange = (event) => {
        let { name, value, type } = event.target
        //chèn vào key của state.values giá trị là value nếu như người dùng nhập giá trị vào input
        let changeValues = { ...this.state.values, [name]: value }
        let changeErrors = { ...this.state.error }
        //trim() sẽ giúp mảng xóa hết các dấu cách, dòng if này sẽ check dữ liệu của input có trống hay không
        if (value.trim() === '') {
            changeErrors[name] = name + ' không được bỏ trống!'
        } else {
            changeErrors[name] = ''
        }
        if (type === 'email') {
            //regux của email
            const re = /\S+@\S+\.\S+/;
            //dùng regux test email, nếu email nhập vào là sai sẽ trả ra false, !false sẽ là true và gán giá trị cho changeError
            if (value.trim() === '') {
                changeErrors[name] = name + ' không được bỏ trống!'
            } else if (!re.test(value)) {
                changeErrors[name] = name + ' không hợp lệ!'
            } else {
                changeErrors[name] = ''
            }
        }
        //check passwordConfirm có giống password đã điền trước hay không
        if (name === 'passwordConfirm') {
            const checkVerifyPassword = (this.state.values.password === value)
            if (!checkVerifyPassword) {
                changeErrors[name] = 'password không trùng khớp!'
            } else {
                changeErrors[name] = ''
            }
        }
        this.setState({
            values: changeValues,
            error: changeErrors
        })
    }

    handleSubmit = (event) => {
        //chặn không cho submit reload lại trang
        event.preventDefault()
        const { values, error } = this.state
        //khởi tạo biến kiểm tra dữ liệu đã nhập vào đúng hết chưa
        let valid = true
        //kiểm tra xem có dữ liệu nào chưa điền hay không
        for (let key in values) {
            if (values[key] === '') {
                valid = false
            }
        }
        //kiểm tra xem có dữ liệu nào chưa valid không
        for (let key in error) {
            if (error[key] !== '') {
                valid = false
            }
        }
        if (valid) {
            Swal.fire({
                title: "Dữ liệu đã được xác nhận!",
                text: 'Bạn có muốn sử dụng tài khoản này luôn không',
                icon: 'success',
                confirmButtonText: 'Có',
            })
        } else {
            Swal.fire({
                title: "Bạn cần nhập đầy đủ dữ liệu!",
                icon: 'error',
                confirmButtonText: 'Chấp nhận'
            })
        }
    }

    render() {
        return (
            <div className='d-flex justify-content-center' style={{ backgroundColor: '#eeeeee', margin: '0', padding: '0', height: '713px' }}>
                <form onSubmit={(event) => { this.handleSubmit(event) }} style={{ backgroundColor: 'white', height: '600px', marginTop: '50px', width: '650px', fontFamily: 'Google Sans' }}>
                    <h2 className='text-center mt-5'>Profile User</h2>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="group">
                                    <input type="text" name="firstName" required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar" />
                                    <label>firstName</label>
                                    <span className='text text-danger'>{this.state.error.firstName}</span>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="group">
                                    <input type="text" name="lastName" required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar" />
                                    <label>lastName</label>
                                    <span className='text text-danger'>{this.state.error.lastName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="group">
                                    <input className='input-full' name='userName' type="text" required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar-full" />
                                    <label>userName</label>
                                    <span className='text text-danger'>{this.state.error.userName}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="group">
                                    <input className='input-full' name='email' type="email" required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar-full" />
                                    <label>Email</label>
                                    <span className='text text-danger'>{this.state.error.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="group">
                                    <input type="password" name='password' required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar" />
                                    <label>password</label>
                                    <span className='text text-danger'>{this.state.error.password}</span>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="group">
                                    <input type="password" name='passwordConfirm' required onChange={(event) => { this.handleOnChange(event) }} />
                                    <span className="highlight" />
                                    <span className="bar" />
                                    <label>passwordConfirm</label>
                                    <span className='text text-danger'>{this.state.error.passwordConfirm}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='btn-dark' style={{ width: '200px', height: '40px', borderRadius: '4px' }}>Xác nhận</button>
                    </div>
                </form>
            </div>
        )
    }
}
