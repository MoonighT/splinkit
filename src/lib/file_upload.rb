module FileUpload
  def get_upload_file(params, request)
    file = params[:qqfile].is_a?(ActionDispatch::Http::UploadedFile) ? params[:qqfile] : params[:file]
    x_mime_type = request.headers["X-MIME-TYPE"]
    if not x_mime_type.nil?
      file.content_type = x_mime_type
    end
    file
  end
end
