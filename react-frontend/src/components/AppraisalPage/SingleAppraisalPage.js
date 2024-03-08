import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleAppraisalPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [user, setUser] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("appraisal")
            .get(urlParams.singleAppraisalId, { query: { $populate: ["user"] }})
            .then((res) => {
                set_entity(res || {});
                const user = Array.isArray(res.user)
            ? res.user.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.user
                ? [{ _id: res.user._id, name: res.user.name }]
                : [];
        setUser(user);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Appraisal", type: "error", message: error.message || "Failed get appraisal" });
            });
    }, [props,urlParams.singleAppraisalId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Appraisal</h3>
                </div>
                <p>appraisal/{urlParams.singleAppraisalId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Target</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.target}</p></div>
                    <label className="text-sm text-primary">user</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.user?.name}</p></div>
            <label className="text-sm">user</label>
            {user.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleAppraisalPage);
