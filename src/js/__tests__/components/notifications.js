import React from 'react'; // eslint-disable-line no-unused-vars
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { List, fromJS } from 'immutable';
import { shallow } from 'enzyme';

import { NotificationsPage } from '../../components/notifications';
import AllRead from '../../components/all-read';
import Oops from '../../components/oops';

function setup(props) {
  const wrapper = shallow(<NotificationsPage {...props} />);

  return {
    props: props,
    wrapper: wrapper,
  };
};

describe('components/notifications.js', function () {

  const notifications = fromJS([
    {
      id: 1,
      subject: {
        title: 'Hello. This is a notification.',
        type: 'Issue',
        url: 'https://api.github.com/repos/ekonstantinidis/gitify/issues/123'
      },
      repository: {
        full_name: 'ekonstantinidis/gitify'
      }
    },
    {
      id: 2,
      subject: {
        title: 'Another Test.',
        type: 'PullRequest',
        url: 'https://api.github.com/repos/ekonstantinidis/gitify/pulls/456'
      },
      repository: {
        full_name: 'ekonstantinidis/trevor'
      }
    }
  ]);

  it('should render itself & its children', function () {

    const props = {
      failed: false,
      isFetching: false,
      notifications: notifications,
      searchQuery: ''
    };

    const { wrapper } = setup(props);

    expect(wrapper).toBeDefined();
    expect(wrapper.find(ReactCSSTransitionGroup).children().length).toBe(2);
    expect(wrapper.find('.errored').length).toBe(0);
    expect(wrapper.find('.all-read').length).toBe(0);

  });

  it('should render an error message if failed', function () {

    const props = {
      failed: true,
      isFetching: false,
      notifications: List(),
      searchQuery: ''
    };

    const { wrapper } = setup(props);

    expect(wrapper).toBeDefined();
    expect(wrapper.find(ReactCSSTransitionGroup).length).toBe(0);
    expect(wrapper.find('.loading-container').length).toBe(0);
    expect(wrapper.find('.all-read').length).toBe(0);
    expect(wrapper.find(Oops).length).toBe(1);

  });

  it('should render the all read screen if no notifications and no search query', function () {

    const props = {
      failed: false,
      isFetching: false,
      notifications: List(),
      searchQuery: ''
    };

    const { wrapper } = setup(props);

    expect(wrapper).toBeDefined();
    expect(wrapper.find(ReactCSSTransitionGroup).length).toBe(0);
    expect(wrapper.find('.loading-container').length).toBe(0);
    expect(wrapper.find('.all-read').length).toBe(0);
    expect(wrapper.find('.errored').length).toBe(0);

    expect(wrapper.find(AllRead).length).toBe(1);

  });

});
