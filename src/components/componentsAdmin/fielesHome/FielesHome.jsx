import React, { useState } from 'react';
import { Message } from 'primereact/message';
import { NavLink } from 'react-router-dom';
import '../fielesHome/FielesHome.css';

function BodyHome() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {/* ----------TABLA de las fieles a mostrar------------ */}
            <div className='table-bordered container_tabless mx-auto  '>
                <div className='fieles_title'>
                    <h1 className='c_black text_positionCenter text_caption'>Fieles</h1>

                    <div className='eye_fiel'>
                        <NavLink to="/mis-fieles">
                            <i 
                                className={`icon_Eye pi ${isHovered ? 'pi-eye' : 'pi-eye-slash'}`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            ></i>
                        </NavLink>
                    </div>
                </div>

                <table className="table table-bordered mx-auto">
                    <thead>
                        <tr>
                            <th scope="col" className='text-center'>#</th>
                            <th scope="col" className='text-center'><i className='pi pi-user'></i> </th>
                            <th scope="col"><i className='pi pi-spin pi-clock text-center'></i></th>
                            <th scope='col' className='text-center'><i className='pi pi-chart-bar'></i> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <th scope="row">1</th>
                            <td>
                                <NavLink to='/fieles' className='text_d_n c_black linksNombres'>
                                    Mark
                                </NavLink>
                            </td>
                            <td>---</td>
                            <td className='message'><Message severity="info" text="Info Message" /></td>
                        </tr>
                        <tr className='text-center'>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>---</td>
                            <td><Message severity="warn" text="Warning Message" /></td>
                        </tr>
                        <tr className='text-center'>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>---</td>
                            <td><Message severity="error" text="Error Message" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default BodyHome;
