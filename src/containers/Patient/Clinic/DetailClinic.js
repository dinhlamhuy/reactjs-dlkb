import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader.js";
import DoctorSchedule from "../Doctor/DoctorSchedule.js";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor.js";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import {
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import "./DetailClinic.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let data = await getDetailClinicById(this.props.match.params.id);

      if (data && data.errCode === 0) {
        let arrDoctorId = [];
        if (data && !_.isEmpty(data.data)) {
          let arr = data.data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataClinic: data.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  getDataDetailClinic = async (id, location) => {
    let data = await getDetailClinicById(id);

    if (data && data.errCode === 0) {
      let arrDoctorId = [];
      if (data && !_.isEmpty(data.data)) {
        let arr = data.data.doctorClinic;
        if (arr && arr.length > 0) {
          arr.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }
      }
      return {
        dataClinic: data.data,
        arrDoctorId: arrDoctorId,
      };
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  hanldeOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let data = await getDetailClinicById(this.props.match.params.id);

      if (data && data.errCode === 0) {
        let arrDoctorId = [];
        if (data && !_.isEmpty(data.data)) {
          let arr = data.data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataClinic: data.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { language } = this.props;
    let { arrDoctorId, dataClinic } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="detail-clinic-container">
          <div className="description-clinic">
            <div className="description-clinic-title">
              {dataClinic && !_.isEmpty(dataClinic) ? dataClinic.name : ""}
            </div>
            {dataClinic && dataClinic.descriptionHTML && (
              <div
                className="description-clinic-content"
                dangerouslySetInnerHTML={{
                  __html: dataClinic.descriptionHTML,
                }}
              ></div>
            )}
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index + "_" + item}>
                  <div className="content-left ">
                    {" "}
                    <ProfileDoctor
                      id={index}
                      DoctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    />
                  </div>
                  <div className="content-right">
                    <DoctorSchedule isDoctorId={item} />
                    <DoctorExtraInfor isDoctorId={item} />
                  </div>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
