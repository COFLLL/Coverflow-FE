// ReAnswerModals

import React from 'react';
import CommonModal from './commonModal';
import { styled } from 'styled-components';
import Button from '../button/Button/Button';
import { RSTATUS } from '../../global/constants/adminOption';
interface Reports {
  reportId: number;
  reportContent: string;
  reportType: string;
  reportStatus: boolean;
  reporterNickname?: string;
  reportedNickname?: string;
  questionId?: string;
  createdAt?: number;
}

type ModalProps = {
  close?: () => void;
  open?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  // onClick?: React.MouseEventHandler<HTMLBodyElement>;
  reports?: Reports;
  showList?: () => void;
  handleSearch?: () => void;
};

const ReAnswerModals = ({ close, reports }: ModalProps) => {
  return (
    <div>
      <CommonModal onClose={close}>
        {/* <Inners onClick={(e) => e.stopPropagation()}> */}
        <Inners>
          <InnerTitle>신고 기본 정보</InnerTitle>
          <ReportTables key={reports?.reportId}>
            <ReportKind>질문번호</ReportKind>
            <Reportapis>{reports?.questionId}</Reportapis>
            <ReportKind>답변번호</ReportKind>
            <Reportapis>{reports?.reportId}</Reportapis>
            <ReportKind>작성자</ReportKind>
            <Reportapis>{reports?.reportedNickname}</Reportapis>
            <ReportKind>신고사유</ReportKind>
            <Reportapis>{reports?.reportStatus}</Reportapis>
            <ReportKind>신고자</ReportKind>
            <Reportapis>{reports?.reporterNickname}</Reportapis>
            <ReportKind>신고일</ReportKind>
            <Reportapis>{reports?.createdAt}</Reportapis>
          </ReportTables>
          <InnersubTitle>신고 상태 변경</InnersubTitle>
          <ReportStateContainer>
            <StateTitle>신고 상태</StateTitle>
            <StateSelection
              className="ad-searchOption-select"
              value={reports?.reportId}
            >
              <option value=""></option>
              {RSTATUS.map((RSTATUS) => (
                <option key={RSTATUS.key} value={RSTATUS.key}>
                  {RSTATUS.value}
                </option>
              ))}
            </StateSelection>
          </ReportStateContainer>
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

const ReportTables = styled.div`
  width: 702px;
  height: 224px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 104px 599px;
  grid-template-rows: 36.5px 36.5px 36.5px 36.5px 36.5px 36.5px;
`;

const ReportKind = styled.div`
  border: 1px solid black;
  width: 104px;
  text-align: center;
  padding-top: 10px;
  font-size: 16px;
  background-color: #a8a8a8;
`;

const Reportapis = styled.div`
  border: 1px solid black;
  width: 599px;
  text-align: left;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 16px;
`;

const ReportStateContainer = styled.div`
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

export default ReAnswerModals;
