module ApplicationHelper
  def format_datetime(datetime)
    if datetime
      datetime.strftime("%d/%m/%Y %H:%M")
    else
      ""
    end
  end
end
