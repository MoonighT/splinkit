class OmniauthParams
  def initialize(app)
    @app = app
  end

  def call(env)
    session = env["rack.session"]
    if session["omniauth.params"]
      session["omniauth_params"] = session["omniauth.params"]
      status, headers, body = @app.call(env)
      session["omniauth_params"] = nil
    else
      status, headers, body = @app.call(env)
    end
    [status, headers, body]
  end
end
