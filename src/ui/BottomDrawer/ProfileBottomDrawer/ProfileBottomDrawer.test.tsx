import { fireEvent, render, RenderResult } from "@testing-library/react";

import ProfileBottomDrawer from "./ProfileBottomDrawer";

const AVATAR = "Test";
const DESC = "Test Description";
const NICKNAME = "Test Nickname";

describe("UI ProfileBottomDrawer Component", () => {
  let rendered: RenderResult;
  let trigger: HTMLElement;
  let consoleWarnMock: jest.SpyInstance;
  let consoleWarnMockFunction: jest.Mock;
  let onClickEditProfile: jest.Mock;

  beforeEach(() => {
    consoleWarnMockFunction = jest.fn();
    consoleWarnMock = jest
      .spyOn(console, "error")
      .mockImplementation(consoleWarnMockFunction);
    onClickEditProfile = jest.fn();
    rendered = render(
      <ProfileBottomDrawer
        isMine
        is방장
        avatarProps={{ text: AVATAR }}
        description={DESC}
        nickname={NICKNAME}
        trigger={<div>trigger</div>}
        onClickEditProfile={onClickEditProfile}
      />
    );
    trigger = rendered.getByText("trigger");
  });

  afterEach(() => {
    consoleWarnMock.mockRestore();
    consoleWarnMockFunction.mockClear();
  });

  it("should render trigger", () => {
    expect(trigger).toBeInTheDocument();
  });

  describe("after trigger clicked", () => {
    beforeEach(() => {
      fireEvent.click(trigger);
    });

    it("should open when trigger clicked", () => {
      expect(rendered.getByText(DESC)).toBeInTheDocument();
    });

    it("should close when close button clicked", () => {
      fireEvent.click(rendered.getByText("확인"));
      expect(rendered.queryByText(DESC)).not.toBeInTheDocument();
    });

    it("should trigger onClickEditProfile", () => {
      fireEvent.click(rendered.getByLabelText("프로필 수정"));
      expect(onClickEditProfile).toHaveBeenCalled();
    });
  });
});
