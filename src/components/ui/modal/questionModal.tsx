// import React, { useRef } from 'react';
import React from 'react';
// import CommonModal from './commonModal';
// import { useOutSideClick } from './useOutsideClick';
// import { ModalContainer } from './modalContainer';
import CommonModal from './commonModal';
import { styled } from 'styled-components';
import Button from '../button/Button/Button';
import { qStatus } from '../../global/constants/adminOption';

interface AdminQuesions {
  questionId: number;
  companyName: string;
  nickname: string;
  questionerNickname: string;
  questionerTag: string;
  questionTitle: string;
  questionContent: string;
  questionTag: string;
  questionCategory: string;
  answerCount: number;
  questionViewCount: number;
  reward: number;
  selectionStatus: boolean;
  questionStatus: boolean;
  age: string;
}

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
  // onClick?: () => void;
  questions?: AdminQuesions;
  onClick?: React.MouseEventHandler<HTMLBodyElement>;
  handleSearch: () => void;
  showqList: () => void;
};

const QuestionModals = ({ close, questions }: ModalProps) => {
  return (
    <div>
      <CommonModal onClose={close}>
        <Inners onClick={(e) => e.stopPropagation()}>
          <InnerTitle>회원 기본 정보</InnerTitle>
          <MemberTables key={questions?.questionId}>
            <MemberKind>번호</MemberKind>
            <Memberapis>{questions?.questionId}</Memberapis>
            <MemberKind>제목</MemberKind>
            <Memberapis>{questions?.questionTitle}</Memberapis>
            <MemberKind>닉네임</MemberKind>
            <Memberapis>{questions?.questionerNickname}</Memberapis>
            <MemberKind>기업명</MemberKind>
            <Memberapis>{questions?.companyName}</Memberapis>
          </MemberTables>
          <InnersubTitle>질문 상태 변경</InnersubTitle>
          <MemberStateContainer>
            <StateTitle>질문 상태</StateTitle>
            <StateSelection
              className="ad-searchOption-select"
              value={String(questions?.questionStatus)}
            >
              <option value=""></option>
              {qStatus?.map((questionStatus) => (
                <option key={questionStatus.key} value={questionStatus.key}>
                  {questionStatus.value}
                </option>
              ))}
            </StateSelection>
          </MemberStateContainer>
          <ButtonContainer>
            <Button variant="admin" onClick={() => close}>
              수정
            </Button>
            {/* <ModalButton onClose={close}>
              수정
            </ModalButton> */}
          </ButtonContainer>
        </Inners>
      </CommonModal>
    </div>
  );
};

const Inners = styled.div`
  align-content: left;
  padding-left: 50px;
  padding-top: 70px;
`;

const InnerTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`;
const InnersubTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 50px;
`;

const MemberTables = styled.div`
  width: 702px;
  height: 146px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 104px 599px;
  grid-template-rows: 36.5px 36.5px 36.5px 36.5px;
`;

const MemberKind = styled.div`
  border: 1px solid black;
  width: 104px;
  text-align: center;
  padding-top: 10px;
  font-size: 16px;
  background-color: #a8a8a8;
`;

const Memberapis = styled.div`
  border: 1px solid black;
  width: 599px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 16px;
`;

const MemberStateContainer = styled.div`
  display: flex;
  padding-bottom: 2%;

  /* justify-content: space-between; */
  align-items: center;
`;
const StateTitle = styled.p`
  font-size: 17px;
  padding-right: 20px;
`;
const StateSelection = styled.select`
  padding-left: 20px;
  width: 163px;
  height: 28px;
  background-color: rgba(217, 217, 217, 1);
  border: none;
`;

const ButtonContainer = styled.div`
  align-items: center;
  padding-left: 280px;
`;

// const ModalButton = styled.button`
//   background-color: #ff8d1d;
//   width: 122px;
//   height: 38px;
//   text-align: center;
// `;

export default QuestionModals;
