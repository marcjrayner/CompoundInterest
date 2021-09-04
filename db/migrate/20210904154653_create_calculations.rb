class CreateCalculations < ActiveRecord::Migration[6.1]
  def change
    create_table :calculations do |t|
      t.string :name
      t.decimal :principal
      t.decimal :interest_rate
      t.integer :years

      t.timestamps
    end
  end
end
