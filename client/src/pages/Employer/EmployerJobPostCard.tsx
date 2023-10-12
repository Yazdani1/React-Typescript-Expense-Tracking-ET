import React, { FC, ReactNode, useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { CgExpand } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';

import ModalBox from '../../components/Modal/ModalBox';
import style from './EmployerJobPost.module.scss';
import TextField from '../../components/Input/TextField';
import { UpdateJobPostProps, updateSingleJobPost, deleteSingleJobPost } from '../../services/API';
import { JobPosts, Visibility } from '../../services/DataProvider';
import DropDownList from '../../components/DropDown/DropDownList';
import ConfirmModal from '../../components/Modal/ConfirmModal';

interface EmployerJobPostCardProps {
  jobpost: JobPosts;
  loadJobposts: () => void;
}

const EmployerJobPostCard: FC<EmployerJobPostCardProps> = ({ jobpost, loadJobposts }) => {
  /****************************************/
  /******Modal Box to Create Job Post   ***/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /******Modal Box to Edit Job Post   ***/
  /****************************************/

  const [editOpenModal, setEditOpenModal] = useState<boolean>(false);

  const onOpenEditModal = () => {
    setEditOpenModal(true);
  };

  const onCloseEditModal = () => {
    setEditOpenModal(false);
  };

  /****************************************/
  /******Modal Box to delete confirm ***/
  /****************************************/

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const onOpenDeleteConfirmModal = () => {
    setOpenConfirmModal(true);
  };

  const onCloseDeleteConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  /****************************************/
  /****** Update job post   ***************/
  /****************************************/

  const [title, setTitle] = useState<string>('');
  const [des, setDes] = useState<string>('');
  const [jobCity, setJobCity] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Public);
  const [addjobSkills, setAddJobSkills] = useState<string>('');
  const [jobSkillsList, setJobSkillsList] = useState<string[]>([]);

  const addJobSkills = () => {
    setJobSkillsList([...jobSkillsList, addjobSkills]);
    setAddJobSkills('');
  };

  const removeJobSkills = (skillIndex: string) => {
    const skills = jobSkillsList.filter((item) => item !== skillIndex);
    setJobSkillsList(skills);
  };

  const onSubmitUpdateSingleJob = async () => {
    try {
      const payload: UpdateJobPostProps = {
        title: title,
        des: des,
        jobCity: jobCity,
        jobSkills: jobSkillsList,
        visibility: visibility,
      };

      const res = await updateSingleJobPost(jobpost._id, payload);

      if (res) {
        toast.success('Job post updated successfully', {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadJobposts();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const onResetJobPostInputField = () => {
    setTitle('');
    setDes('');
    setJobCity('');
    setVisibility(Visibility.Public);
    setAddJobSkills('');
    setJobSkillsList([]);
  };

  /****************************************/
  /****** Delete a single job post   ******/
  /****************************************/

  const deleteEmployerSingleJobPost = async () => {
    try {
      const res = await deleteSingleJobPost(jobpost?._id);
      if (res) {
        toast.success('Job post deleted successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
        loadJobposts();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  useEffect(() => {
    setTitle(jobpost?.title);
    setDes(jobpost?.des);
    setJobCity(jobpost?.jobCity);
    setVisibility(jobpost?.visibility);
    setJobSkillsList(jobpost?.jobSkills);

    loadJobposts();
  }, []);

  return (
    <div className={style.jobpost_container}>
      <h6>
        <Link to={'/employer-job-details-application/' + jobpost.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
          {jobpost.title}
        </Link>
      </h6>
      {jobpost.visibility === 'Public' && <p style={{ color: 'green', fontWeight: 'bold' }}>{jobpost.visibility}</p>}
      {jobpost.visibility === 'Private' && <p style={{ color: 'red', fontWeight: 'bold' }}>{jobpost.visibility}</p>}

      {jobpost.status === 'Approved' && <p style={{ color: 'green', fontWeight: 'bold' }}>{jobpost.status}</p>}
      {jobpost.status === 'Panding' && <p style={{ color: 'red', fontWeight: 'bold' }}>{jobpost.status}</p>}

      <p>{jobpost.jobCity}</p>
      <p>{jobpost.totalApplication}</p>
      <p onClick={onOpenModal} style={{ cursor: 'pointer' }}>
        <CgExpand size={30} color="orange" />
      </p>
      <p>
        <DropDownList showUpdateDeleteButton handleUpdateOnOpenModal={onOpenEditModal} deleteSingleItem={onOpenDeleteConfirmModal} />
      </p>

      {/* To edit a single job */}
      <ModalBox
        open={editOpenModal}
        onCloseModal={onCloseEditModal}
        title="Update job post"
        onSaveButton={onSubmitUpdateSingleJob}
        onResetButton={onResetJobPostInputField}
      >
        <TextField label="Title" value={title} setValue={setTitle} />
        <TextField label="City" value={jobCity} setValue={setJobCity} />
        <TextField label="Description" value={des} setValue={setDes} />

        <div className={style.visibility_drop_down_container}>
          <select value={visibility} className={style.visiblity_item} onChange={(e) => setVisibility(e.target.value as Visibility)}>
            {Object.keys(Visibility).map((vtype) => (
              <option value={vtype}>{vtype}</option>
            ))}
          </select>
        </div>

        <TextField label="Job skills" value={addjobSkills} setValue={setAddJobSkills} />

        <div className={style.skills_container}>
          {jobSkillsList.map((skill, index) => (
            <div key={index} className={style.skill_item}>
              <p className={style.skill}>{skill}</p>
              <p className={style.close_icon} onClick={() => removeJobSkills(skill)}>
                <IoMdClose />
              </p>
            </div>
          ))}
        </div>
        <button className="btn btn-warning" onClick={addJobSkills}>
          Add Skills
        </button>
      </ModalBox>

      {/* To preview a single job post modal*/}

      <ModalBox open={open} onCloseModal={onCloseModal} title="Job preview">
        <h6>{jobpost.title}</h6>
        <p>{jobpost.des}</p>
        <p>{jobpost.jobCity}</p>
        <p>{jobpost.visibility}</p>
        <p>{jobpost.status}</p>
        <p>{jobpost.totalApplication}</p>
        <p>
          Approved By: {jobpost.approvedBy?.name}.{jobpost.approvedBy?.role}
        </p>
      </ModalBox>

      {/* To delete a single item - confirm modal to delte */}
      <ConfirmModal
        title="Delete job post"
        deletePost={deleteEmployerSingleJobPost}
        showDeleteButton
        open={openConfirmModal}
        onCloseModal={onCloseDeleteConfirmModal}
      >
        <h6>Are you sure you want to delete this job post?</h6>
      </ConfirmModal>
    </div>
  );
};

export default EmployerJobPostCard;
