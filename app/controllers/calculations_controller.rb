class CalculationsController < ApplicationController
  before_action :set_calculation, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /calculations or /calculations.json
  def index
    @calculations = Calculation.all
  end

  # GET /calculations/1 or /calculations/1.json
  # def show
  # end

  # GET /calculations/new
  def new
    @calculation = Calculation.new
  end

  def calculate_result 
    @calculation = Calculation.new

    principal = params[:principal].to_f
    interest_rate = params[:interest_rate].to_f / 100
    years = params[:years].to_i

    #once per year for now
    compounds_per_year = 1

    valid = true
    message = ""

    result = principal * ((1 + interest_rate) ** (compounds_per_year * years))

    Rails.logger.debug "result" 
    Rails.logger.debug result 

    data = {
        valid: valid,
        message: message,
        result: result
    }

    render json: data.to_json

    return result

  end


  # GET /calculations/1/edit
  def edit
  end

  # POST /calculations or /calculations.json
  def create
    @calculation = Calculation.new(calculation_params)

    respond_to do |format|
      if @calculation.save
        format.html { redirect_to @calculation, notice: "Calculation was successfully created." }
        format.json { render :show, status: :created, location: @calculation }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @calculation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /calculations/1 or /calculations/1.json
  def update
    respond_to do |format|
      if @calculation.update(calculation_params)
        format.html { redirect_to @calculation, notice: "Calculation was successfully updated." }
        format.json { render :show, status: :ok, location: @calculation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @calculation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /calculations/1 or /calculations/1.json
  def destroy
    @calculation.destroy
    respond_to do |format|
      format.html { redirect_to calculations_url, notice: "Calculation was successfully destroyed." }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_calculation
      @calculation = Calculation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def calculation_params
      params.require(:calculation).permit(:name, :currency, :principal, :interest_rate, :years)
    end
end
