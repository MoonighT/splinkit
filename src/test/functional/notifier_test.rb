require 'test_helper'

class NotifierTest < ActionMailer::TestCase
  test "event_registered" do
    mail = Notifier.event_registered
    assert_equal "Event registered", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
