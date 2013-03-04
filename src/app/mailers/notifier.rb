class Notifier < ActionMailer::Base
  default from: "notifications@splinkit.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier.event_registered.subject
  #
  def event_registered(registration, event)
    @registration = registration
    @event = event
    mail(to: registration[:email], subject: "Confirmation for #{event.name} - Splinkit",
      content_type: "text/html")
  end
end
