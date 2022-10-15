create table grade (
	grade_id uuid not null,
	grade_name character varying not null,
	primary key (grade_id,grade_name)
)

create table users (
    user_id uuid not null,
    first_name character varying(255) not null,
    last_name character varying(255) not null,
    email character varying(255) not null,
    phone_number character varying(255),
    password character varying(255) not null,
    user_type character varying not null,
    primary key (user_id)
)

create table type_of_users (
    user_type character varying not null,
    name_type character varying(255) not null,
    primary key (user_type)
)

create table student (
    user_id uuid not null,
    primary key (user_id)
)

create table teacher (
    user_id uuid not null,
    primary key (user_id)
)

create table admin (
    user_id uuid not null,
    primary key (user_id)
)

create table course_creator (
    course_creator_id uuid not null,
    user_id uuid not null,
    section_id uuid not null
    primary key (course_creator_id)
)

create table course_offering (
    section_id uuid not null,
    course_id uuid not null,
    course_code character varying(255) not null,
    course_name character varying(255) not null,
    category character varying (255) not null,
    year int not null,
    term_type character varying not null,
    start_date date not null,
    end_date date not null,
    user_id_teacher uuid not null,
    primary key (section_id,course_id)
)


create table course(
    course_id uuid not null,
    course_code character varying(255) not null,
    course_name character varying(255) not null,
    category character varying (255) not null,
    start_date date not null,
    end_date date not null,
    is_active boolean not null,
    thumbnail character varying(255) not null
    primary key (course_id)
)

create table lession(
    lession_id uuid not null,
    course_id uuid not null,
    lession_name character varying(255) not null,
    lession_description character varying(255) null,
    lession_time timestamp not null,
    video_id uuid null,
    pdf_file_id uuid null,
    primary key (lession_id, course_id)
)

create table lession_video(
    video_id uuid not null,
    lession_id uuid not null,
    video_file character varying(255) not null,
    primary key (video_id)
)

create table lession_pdf(
    pdf_file_id uuid not null,
    lession_id uuid not null,
    pdf_file character varying(255) not null,
    primary key (pdf_file_id)
)

create table assignment(
    assignment_id uuid not null,
    lession_id uuid not null,
    description character varying(255) null,
    deadline timestamp not null,
    attached_file character varying(255) not null,
    primary key(assignment_id)
)

create table assignment_submission (
    asg_submission_id uuid not null,
    assignment_id uuid not null,
    user_id uuid not null,
    grade character varying null,
    status character varying(255), 
    primary key(asg_submission_id)
)

create table enroll (
    enroll_id uuid not null,
    user_id uuid not null,
    course_id uuid not null,
    primary key(enroll_id)
)

create table student_course_detail (
    enroll_id uuid not null,
    grade character not null,
    grade_details float null,
    primary key(enroll_id)
)

create table grade_type (
    grade character not null,
    description character varying(255) null,
    primary key(grade)
)
